using AspNetCore.Firebase.Authentication.Extensions;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SurveyAPI.Interfaces;
using SurveyAPI.Services;
using SurveyAPI.SurveyModels;
using SurveyAPI.Utils;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Read the configuration
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

var serviceConfig = configuration.GetSection("service_config").Get<ServiceConfig>();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddEntityFrameworkMySql().AddDbContext<WebsurveyPfwContext>(options =>
{
    options.UseMySql(configuration.GetSection("Connection").Value, new MariaDbServerVersion(new Version()));
});
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddDbContext<WebsurveyPfwContext>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ISurvey, SurveyService>();
builder.Services.AddScoped<IQuestion, QuestionService>();

// Initialize the Firebase Admin SDK
var firebaseApp = FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromJson(Newtonsoft.Json.JsonConvert.SerializeObject(serviceConfig))
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.Authority = "https://securetoken.google.com/" + serviceConfig.project_id;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = "https://securetoken.google.com/" + serviceConfig.project_id,
        ValidateAudience = true,
        ValidAudience = serviceConfig.project_id,
        ValidateLifetime = true
    };
});

//Todo just to help when debugging with swagger, remove
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyBlazor", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        );
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();