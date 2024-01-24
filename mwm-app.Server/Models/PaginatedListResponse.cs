namespace mwm_app.Server.Models {
    public class PaginatedListResponse<T> {
            public bool HasNextPage { get; set; }
            public bool HasPreviousPage { get; set; }
            public ICollection<T> Data { get; set; }
            public int TotalPages { get; set; }
        }
}