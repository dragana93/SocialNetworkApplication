using Microsoft.EntityFrameworkCore;
using SocialNetworkApp.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(options =>
{
    // options.UseSqlServer("data source=.;database=social_network;Integrated Security=SSPI;persist security info=True;Encrypt=False;");
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    //builder.Configuration.GetConnectionString("DefaultConnection")
});

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
