using CastorBackend.Domain.Entities;
using CastorBackend.Infrastructure.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.Domain.Services
{
    public class EmployeeService
    {
        private readonly InterfaceEmployeedRepository _employeeRepository;

        public EmployeeService(InterfaceEmployeedRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public Task<IEnumerable<Employee>> GetAllEmployees()
        {
            return _employeeRepository.GetAllEmployees();
        }

        public Task<Employee> GetEmployeeById(int id)
        {
            return _employeeRepository.GetEmployeeById(id);
        }

        public async Task AddEmployee(Employee employee)
        {
            // Define el directorio donde se guardarán las imágenes
            string imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            // Verifica si el directorio existe, si no, créalo
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            // Verifica si la imagen está en formato base64
            if (!string.IsNullOrEmpty(employee.Foto))
            {
                // Decodifica la imagen base64
                var base64Data = employee.Foto.Split(',')[1];
                var imageBytes = Convert.FromBase64String(base64Data);

                // Genera un nombre único para la imagen
                var fileName = $"{Guid.NewGuid()}.jpg"; // Usa la extensión adecuada según el formato

                // Define la ruta completa para guardar la imagen
                var filePath = Path.Combine(imagesFolder, fileName);

                // Guarda la imagen en el servidor
                await File.WriteAllBytesAsync(filePath, imageBytes);

                // Asigna la URL de la imagen al empleado
                employee.Foto = $"http://localhost:5076/images/{fileName}";
            }

            // Asigna la fecha de creación actual
            employee.FechaIngreso = DateTime.UtcNow;

            // Guarda el empleado en la base de datos
            await _employeeRepository.AddEmployee(employee);
        }

        public async Task<bool> UpdateEmployee(Employee employee)
        {
            // Define el directorio donde se guardarán las imágenes
            string imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            // Verifica si el directorio existe, si no, créalo
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            // Obtiene el empleado actual desde la base de datos para comparar la imagen anterior
            var currentEmployee = await _employeeRepository.GetEmployeeById(employee.Id);
            if (currentEmployee != null)
            {
                // Si el empleado tiene una imagen anterior, elimínala
                if (!string.IsNullOrEmpty(currentEmployee.Foto) && currentEmployee.Foto.Contains("/images/"))
                {
                    // Extrae el nombre del archivo de la URL
                    var oldFileName = currentEmployee.Foto.Split('/').Last();
                    var oldFilePath = Path.Combine(imagesFolder, oldFileName);

                    // Elimina la imagen antigua si existe
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }
                }
            }

            // Verifica si la imagen está en formato base64
            if (!string.IsNullOrEmpty(employee.Foto) && employee.Foto.Contains("data:image"))
            {
                // Decodifica la imagen base64
                var base64Data = employee.Foto.Split(',')[1];
                var imageBytes = Convert.FromBase64String(base64Data);

                // Genera un nombre único para la imagen
                var fileName = $"{Guid.NewGuid()}.jpg"; // Usa la extensión adecuada según el formato

                // Define la ruta completa para guardar la imagen
                var filePath = Path.Combine(imagesFolder, fileName);

                // Guarda la imagen en el servidor
                await File.WriteAllBytesAsync(filePath, imageBytes);

                // Asigna la URL de la imagen al empleado
                employee.Foto = $"http://localhost:5076/images/{fileName}";
            }

            // Actualiza el empleado en la base de datos
            return await _employeeRepository.UpdateEmployee(employee);
        }


        public Task<bool> DeleteEmployee(int id)
        {
            return _employeeRepository.DeleteEmployee(id);
        }
    }
}
