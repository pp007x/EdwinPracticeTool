namespace LoginApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int CompanyId { get; set; }
        public bool IsAdmin { get; set; } = false;
    }


public class TotalScore
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ScoreValueC { get; set; }
    public int ScoreValueS { get; set; }
    public int ScoreValueI { get; set; }
    public int ScoreValueD { get; set; }
    
}


}
