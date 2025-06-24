
using MinhaPrimeiraApi.Contracts.Infrastructure;
using MinhaPrimeiraApi.Contracts.Repository;
using MinhaPrimeiraApi.Contracts.Service;
using MinhaPrimeiraApi.Infrastructure;
using MinhaPrimeiraApi.Repository;
using MinhaPrimeiraApi.Services;

namespace MinhaPrimeiraApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //DEPENDENCIAS
            builder.Services.AddSingleton<IConnection, Connection>();

            builder.Services.AddScoped<IEspecialidadeService, EspecialidadeService>();
            builder.Services.AddTransient<IEspecialidadeRepository, EspecialidadeRepository>();

            builder.Services.AddScoped<IAssentoService, AssentoService>();
            builder.Services.AddTransient<IAssentoRepository, AssentoRepository>();

            builder.Services.AddScoped<IAviaoService, AviaoService>();
            builder.Services.AddTransient<IAviaoRepository, AviaoRepository>();

            builder.Services.AddScoped<IPassagemService, PassagemService>();
            builder.Services.AddTransient<IPassagemRepository, PassagemRepository>();

            builder.Services.AddScoped<IVooService, VooService>();
            builder.Services.AddTransient<IVooRepository, VooRepository>();

            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
