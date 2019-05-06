using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveler.Services;
using Traveler.Entities;

namespace Traveler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private IDataService dataService;

        public DataController(
            IDataService _dataService)
        {
            this.dataService = _dataService;
        }


        // POST: api/Data/countries
        [HttpPost("countries")]
        public IEnumerable<Country> GetCountries()
        {
            var c = dataService.GetCountries().ToArray();
            return c;
        }

        [HttpPost("cities")]
        public IEnumerable<string> GetCities([FromBody]Country country)
        {
            
            var cities = dataService.GetCities(country).ToArray();
            return cities;
        }

        [HttpPost("cityid")]
        public int GetCityIdByName([FromBody]string cityName)
        {
            return dataService.GetCityIdByNamme(cityName);
        }

        // GET: api/Data/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "asd";
        }

        // POST: api/Data
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Data/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
