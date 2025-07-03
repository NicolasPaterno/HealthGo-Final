using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Infrastructure;
using API_HealthGo.Repository;
using API_HealthGo.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace API_HealthGo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // NOVO: Defina um nome para a sua pol�tica de CORS
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            // Add services to the container.

            // NOVO: Adicione o servi�o de CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      // Adicione a URL do seu frontend React
                                      policy.WithOrigins("http://localhost:5173")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                                  });
            });


            //auth and config JWT
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
                });

            // Authorization service
            builder.Services.AddAuthorization();


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();


            //Depencendcyes
            //connection to database
            builder.Services.AddSingleton<IConnection, Connection>();
            //service for token generation
            builder.Services.AddScoped<ITokenService, TokenService>();

            builder.Services.AddScoped<IPessoaService, PessoaService>();
            builder.Services.AddTransient<IPessoaRepository, PessoaRepository>();

            builder.Services.AddScoped<ILembreteService, LembreteService>();
            builder.Services.AddTransient<ILembreteRepository, LembreteRepository>();

            builder.Services.AddScoped<IEspecialidadeService, EspecialidadeService>();
            builder.Services.AddTransient<IEspecialidadeRepository, EspecialidadeRepository>();

            builder.Services.AddScoped<IAssentoService, AssentoService>();
            builder.Services.AddTransient<IAssentoRepository, AssentoRepository>();

            builder.Services.AddScoped<IAviaoService, AviaoService>();
            builder.Services.AddTransient<IAviaoRepository, AviaoRepository>();

            builder.Services.AddScoped<IVooService, VooService>();
            builder.Services.AddTransient<IVooRepository, VooRepository>();

            // Config swagger  to use JWT authentication
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "APIHealthGo", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Insira o token JWT desta maneira: Bearer SEU_TOKEN"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // NOVO: Habilite o middleware do CORS. IMPORTANTE: Deve vir antes de UseAuthentication e UseAuthorization.
            app.UseCors(MyAllowSpecificOrigins);

            //enable authentication and authorization middleware 
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();

        }
    }
}
