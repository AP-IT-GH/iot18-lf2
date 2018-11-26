using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using LabFarm.Data;
using MQTTnet.AspNetCore;

namespace LabFarm
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddDbContext<LabContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddHostedMqttServer(builder => builder.WithDefaultEndpointPort(1883));

            //this adds tcp server support based on System.Net.Socket
            services.AddMqttTcpServerAdapter();

            //this adds websocket support
            services.AddMqttWebSocketServerAdapter();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, LabContext labContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();

            app.UseMqttEndpoint();

            app.UseCors("CorsPolicy");

            DbInitializer.Initialize(labContext);
        }
    }
}
