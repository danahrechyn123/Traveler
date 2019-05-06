using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Traveler.Entities;

namespace Traveler.Services
{
    public interface IDataService
    {
        IEnumerable<Country> GetCountries();
        IEnumerable<string> GetCities(Country country);

        int GetCityIdByNamme(string cityName);
    }
    public class DataService : IDataService
    {

        private DataContext dBcontext;

        public DataService(DataContext context)
        {
            this.dBcontext = context;
        }

        public IEnumerable<Country> GetCountries()
        {
            return dBcontext.Countries;
        }
        public IEnumerable<string> GetCities(Country country)
        {
            var countr = dBcontext.Countries.Where(c => c.Name == country.Name).First();
            var cities = dBcontext.Cities.Where(c => c.CountryId == countr.Id).Select(c => c.Name);

            return cities;
        }

        public int GetCityIdByNamme(string cityName)
        {
            return dBcontext.Cities.Where(c => c.Name == cityName).Select(c => c.Id).First();
        }
    }
}
