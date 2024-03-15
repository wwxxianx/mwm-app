namespace mwm_app.Server.Data.DTO
{
    public class UserAddressDTO
    {        
        public int UserID { get; set; }

        public string ReceiverName { get; set; }

        public string ReceiverPhoneNumber { get; set; }

        public string? ReceiverEmail { get; set; }

        public string StateRegion { get; set; }

        public string Postcode { get; set; }

        public string StreetAddress { get; set; }

        public string? AddressUnit { get; set; }

        public bool IsDefault { get; set; }
    }
}
