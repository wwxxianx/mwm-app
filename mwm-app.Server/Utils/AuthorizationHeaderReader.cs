using Microsoft.AspNetCore.Http;
using System.Linq;

public static class AuthorizationHeaderReader
{
    public static string GetBearerToken(HttpContext httpContext)
    {
        if (httpContext?.Request?.Headers?.ContainsKey("Authorization") == true)
        {
            var authorizationHeader = httpContext.Request.Headers["Authorization"].FirstOrDefault();
            
            if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                // Extract the Bearer token
                return authorizationHeader.Substring("Bearer ".Length);
            }
        }

        return null; // No Bearer token found
    }
}
