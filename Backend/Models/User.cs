namespace LoginApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; } = false;
    }


public class TotalScore
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TotalScoreValue { get; set; }

}


}
