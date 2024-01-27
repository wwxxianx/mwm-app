namespace mwm_app.Server.Data.DTO
{
    public class UserProfileDTO
    {        
        public string? FullName { get; set; }
        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? PhoneNumber { get; set; }

        public DateTime? BirthDate { get; set; }

        public string? ProfileImageUrl { get; set; }

        public string? Gender { get; set; }
    }
}