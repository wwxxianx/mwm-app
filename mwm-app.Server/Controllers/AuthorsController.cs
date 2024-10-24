using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mwm_app.Server.Data;
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Data.ResponseDTO;
using mwm_app.Server.Models;

namespace mwm_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly MainDBContext _context;
        private readonly string dbConnectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=mwmV2;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";

        public AuthorsController(MainDBContext context)
        {
            _context = context;
        }

        public class AuthorRequest {
            public ICollection<string>? Include { get; set; }

            public string? SearchQuery { get; set; }
        }

        // GET: api/Authors
        [HttpGet]
        public async Task<IActionResult> GetAuthors([FromQuery] AuthorRequest authorRequest)
        {
            if (!string.IsNullOrEmpty(authorRequest.SearchQuery)) 
            {
                // Split the search query into individual words
                var searchWords = authorRequest.SearchQuery.Split(" ", StringSplitOptions.RemoveEmptyEntries);
                // Filter books that contain any of the search words in the title
                var authors = await _context.Authors.Where(b => searchWords.Any(word => b.FullName.Contains(word))).ToListAsync();
                return Ok(authors);
            } 
            else if (authorRequest.Include.IsNullOrEmpty())
            {
                return Ok(await _context.Authors.ToListAsync());
            } 
            else
            {
                var authorsWithBooks = await _context.Authors
                    .Include(a => a.Books)
                        .ThenInclude(b => b.Category)
                    .ToListAsync();

                var authorResponse = authorsWithBooks.Select(author => 
                    new AuthorResponseDTO
                    {
                        ID = author.ID,
                        FullName = author.FullName,
                        ImageUrl = author.ImageUrl,
                        Books = author.Books.Select(b => BookResponseDTO.CreateFromBook(b)).ToList(),
                    }
                );
                return Ok(authorResponse);
            }
        }

        // GET: api/Authors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(string id)
        {
            var author = await _context.Authors.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }

        [HttpGet("trending")]
        public async Task<ActionResult<ICollection<Author>>> GetTrendingAuthor()
        {
            List<Author> authors = new List<Author>();
            using (SqlConnection connection = new SqlConnection(dbConnectionString))
            {
                string sqlQuery = @"
                SELECT TOP 8 [a].[ID], [a].[FullName], [a].[ImageUrl]
                FROM [AdminSchema].[Author] AS [a]
                ORDER BY [a].[FullName]
                ";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    connection.Open();
                    
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Author author = new Author
                            {
                                ID = reader["ID"].ToString(),
                                FullName = reader["FullName"].ToString(),
                                ImageUrl = reader["ImageUrl"] is DBNull ? null : reader["ImageUrl"].ToString(),
                            };

                            authors.Add(author);
                        }
                    }
                }
            }
            return Ok(authors);
        }

        // PUT: api/Authors/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Author>> PutAuthor(string id, AuthorDTO authorDTO)
        {
            using (SqlConnection connection = new SqlConnection(dbConnectionString))
            {
                // SQL to update and get the updated author
                string sqlQuery = @"
                UPDATE [AdminSchema].[Author]
                SET [FullName] = @FullName, [ImageUrl] = @ImageUrl
                WHERE [ID] = @AuthorID
                SELECT [ID], [FullName], [ImageUrl] FROM [AdminSchema].[Author] WHERE [ID] = @AuthorID
                ";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@Fullname", authorDTO.FullName);
                    command.Parameters.AddWithValue("@ImageUrl", authorDTO.ImageUrl);
                    command.Parameters.AddWithValue("@AuthorID", id);
                    
                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Author updatedAuthor = new Author
                            {
                                ID = reader["ID"].ToString(),
                                FullName = reader["FullName"].ToString(),
                                ImageUrl = reader["ImageUrl"] is DBNull ? null : reader["ImageUrl"].ToString()
                            };

                            return Ok(updatedAuthor);
                        }
                        else
                        {
                            return NotFound(); // Author not found after update
                        }
                    }
                }
            }
        }

        // POST: api/Authors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor(AuthorDTO authorDTO)
        {
            // Create UUID for author
            string authorID = Guid.NewGuid().ToString();

            Author author = new Author
            {
                ID = authorID,
                FullName = authorDTO.FullName,
                ImageUrl = authorDTO.ImageUrl,
            };

            using (SqlConnection connection = new SqlConnection(dbConnectionString))
            {
                string sqlQuery = @"
                    INSERT INTO [AdminSchema].[Author] ([ID], [FullName], [ImageUrl])
                    VALUES (@ID, @FullName, @ImageUrl);
                ";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@FullName", author.FullName);
                    command.Parameters.AddWithValue("@ImageUrl", author.ImageUrl);
                    command.Parameters.AddWithValue("@ID", authorID);

                    connection.Open();
                    // Determine wheter statement successful
                    int rowsAffected = await command.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok(author);
                    }
                    else
                    {
                        return BadRequest("Failed to create author.");
                    }
                }
            }
        }

        // DELETE: api/Authors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(string id)
        {
            using (SqlConnection connection = new SqlConnection(dbConnectionString))
            {
                string sqlQuery = @"
                    DELETE FROM [AdminSchema].[Author]
                    WHERE [ID] = @AuthorID
                ";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@AuthorID", id);

                    connection.Open();
                    try
                    {
                        int rowsAffected = await command.ExecuteNonQueryAsync();
                        if (rowsAffected > 0)
                        {
                            return StatusCode(204);
                        }
                        else
                        {
                            // Author with the specified ID not found
                            return NotFound();
                        }
                    }
                    catch (Exception)
                    {
                        return BadRequest();
                    }
                }
            }
        }

        private bool AuthorExists(string id)
        {
            return _context.Authors.Any(e => e.ID == id);
        }
    }
}
