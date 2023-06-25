public class Company
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public byte[] Logo { get; set; } // It could also be a string if you store the logo as a file path.
    public string Code { get; set; }
}
