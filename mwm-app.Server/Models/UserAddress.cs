using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mwm_app.Server.Models
{
    public class UserAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }
        
        public User User { get; set; }

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
