using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace tracnghiemAPI.Models
{
    public class Participant
    {
        [Key]
        public int ParticipantId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Password { get; set; }
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
    public class ParticipantResult
    {
        public int ParticipantId { get; set; }
        public int Score { set; get; }
        public int TimeTaken { set; get; }
    }
}
