using BCrypt.Net;

// Script para gerar senhas criptografadas com BCrypt
// Execute este código em um projeto C# para gerar as senhas

class Program
{
    static void Main()
    {
        string adminPassword = "Admin123.";
        string userPassword = "User123.";
        
        string adminHash = BCrypt.Net.BCrypt.HashPassword(adminPassword);
        string userHash = BCrypt.Net.BCrypt.HashPassword(userPassword);
        
        Console.WriteLine("Senhas criptografadas com BCrypt:");
        Console.WriteLine();
        Console.WriteLine($"Admin (Admin123.): {adminHash}");
        Console.WriteLine($"User (User123.): {userHash}");
        Console.WriteLine();
        Console.WriteLine("Use essas senhas no script SQL:");
        Console.WriteLine();
        Console.WriteLine("-- Para Admin:");
        Console.WriteLine($"UPDATE Pessoa SET Senha = '{adminHash}' WHERE Email = 'admin@gmail.com';");
        Console.WriteLine();
        Console.WriteLine("-- Para User:");
        Console.WriteLine($"UPDATE Pessoa SET Senha = '{userHash}' WHERE Email = 'user@gmail.com';");
    }
}
