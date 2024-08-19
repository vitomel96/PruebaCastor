using CastorBackend.Infrastructure.Data;
using CastorBackend.Infrastructure.Repositories;
using CastorBackend.Domain.Services;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection("MongoSettings"));
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<InterfaceEmployeedRepository, EmployeeRepository>();
builder.Services.AddScoped<EmployeeService>();
builder.Services.AddScoped<InterfaceCargoRepository, CargoRepository>();
builder.Services.AddScoped<CargoService>();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api Castor EmployeeManagement", Version = "v1" });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:4200") // URL del frontend
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Construcción de la aplicación
var app = builder.Build();

// Configuración HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Habilita Swagger en el entorno de desarrollo
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api Castor EmployeeManagement");
    }); // Habilita la interfaz de usuario de Swagger
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

// Middleware para servir archivos estáticos desde la carpeta 'wwwroot'
app.UseStaticFiles(); // Asegúrate de habilitar el middleware para archivos estáticos

app.UseAuthorization();

app.MapControllers();

app.Run();
