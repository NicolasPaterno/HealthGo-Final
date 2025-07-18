using atividade_bd_csharp.Contracts.Repository;
using atividade_bd_csharp.Repository;
using MyFirstCRUD.infrastructure;
using Mysqlx.Session;
using PrimeiraAPI.Contracts.Infraestruture;
using PrimeiraAPI.Contracts.Service;

namespace PrimeiraAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(
                        new System.Text.Json.Serialization.JsonStringEnumConverter()
                    );
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                });
            builder.Services.AddRazorPages();
            builder.Services.AddSingleton<IConnection, Connection>();
            builder.Services.AddScoped<IQuartoService, PrimeiraAPI.Services.QuartoService>();
            builder.Services.AddScoped<ICamaQuartoService, PrimeiraAPI.Services.CamaQuartoService>();
            builder.Services.AddScoped<IHotelService, PrimeiraAPI.Services.HotelService>();
            builder.Services.AddScoped<IQuartoRepository, QuartoRepository>();
            builder.Services.AddScoped<IHotelRepository, HotelRepository>();
            builder.Services.AddScoped<ICamaQuartoRepository, CamaQuartoRepository>();
            // Adiciona o Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapRazorPages();
            app.MapControllers();

            // Ativa o Swagger em todos os ambientes
            app.UseSwagger();
            app.UseSwaggerUI();

            app.Run();
        }
    }
}
