using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveler.Dtos;
using Traveler.Entities;

namespace Traveler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedPlaceController : ControllerBase
    {
        private readonly DataContext _context;

        public SavedPlaceController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public void SavePostToTravel([FromBody]SavedPlaceDTO data)
        {
            var item = new SavedPlace()
            {
                TravelId = data.TravelId,
                PlaceId = data.PlaceId
            };
            _context.SavedPlaces.Add(item);
            _context.SaveChanges();
        }

        [HttpPost("getSaved")]
        public IEnumerable<PlaceDTO> getSavedPlace([FromBody]int travelId)
        {
            var placesId = _context.SavedPlaces.Where(x => x.TravelId == travelId).Select(x => x.PlaceId).ToList();
            var places = _context.Places.Where(x => placesId.Contains(x.Id));

            List<PlaceDTO> result = new List<PlaceDTO>();

            foreach(var place in places)
            {
                var res = new PlaceDTO()
                {
                    Name = place.Name,
                    About = place.About,
                    PlaceType = place.PlaceType,
                    PriceType = place.PriceType,
                    Price = place.Price,
                    ImgUrl = place.ImgUrl,
                    CityName = _context.Cities.Where(x => x.Id == place.CityId).Select(x => x.Name).First(),
                    Date = place.Date,
                    Username = _context.Users.Where(x => x.Id == place.UserId).Select(x => x.Username).First(),
                    Id = place.Id,
                    Status = place.Status
                };
                result.Add(res);
            }

            return result;
        }

        [HttpDelete]
        public void Delete([FromBody]SavedPlaceDTO pl)
        {
            var place = _context.SavedPlaces.Where(p => (p.TravelId == pl.TravelId))
                .Where(x => x.PlaceId == pl.PlaceId).Single();
            _context.SavedPlaces.Remove(place);
            _context.SaveChanges();
        }
    }
}