
using mwm_app.Server.Data.DTO;
using mwm_app.Server.Models;

namespace mwm_app.Server.Data.ResponseDTO
{
    public class TopBookResponseDTO
    {
        public string ID { get; set; }

        public BookResponseDTO Book { get; set; }

        public int Ranking { get; set; }
    }
}
