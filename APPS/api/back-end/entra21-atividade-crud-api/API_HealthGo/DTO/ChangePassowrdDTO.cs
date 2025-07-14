using System.ComponentModel.DataAnnotations;

namespace API_HealthGo.DTO
{
    public class ChangePasswordDTO
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
