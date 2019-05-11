﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Traveler.Dtos;
using Traveler.Entities;

namespace Traveler.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceToVisitsController : ControllerBase
    {
        private readonly DataContext _context;

        public PlaceToVisitsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PlaceToVisits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceToVisit>>> GetPlaces()
        {
            return await _context.Places.ToListAsync();
        }

        

        // PUT: api/PlaceToVisits/5
        [HttpPut("acceptPlace")]
        public void AcceptPlace([FromBody]int id)
        {
            var place = _context.Places.Find(id);
            place.Status = 1;
            _context.SaveChanges();            
        }


        [HttpPost("suggestPlace")]
        public void PostPlaceToVisit([FromBody]PlaceDTO  placeToVisit)
        {
            PlaceToVisit place = new PlaceToVisit
            {
                CityId = _context.Cities.Where(c => c.Name == placeToVisit.CityName).Select(c => c.Id).First(),
                UserId = _context.Users.Where(u => u.Id == placeToVisit.UserId).Select(u => u.Id).First(),
                Name = placeToVisit.Name,
                About = placeToVisit.About,
                ImgUrl = placeToVisit.ImgUrl,
                PlaceType = placeToVisit.PlaceType,
                PriceType = placeToVisit.PriceType,
                Price = placeToVisit.Price,
                Status = 0,
                Date = DateTime.UtcNow
            };
            _context.Places.Add(place);
            _context.SaveChanges();
            
        }


        [HttpPost("getPlaces")]
        public IEnumerable<PlaceToVisit> GetPlacesForTravel([FromBody]TravelDTO travel)
        {
            var CityId = _context.Cities.Where(c => c.Name == travel.CityName).Select(c => c.Id).First();
            var places = _context.Places.Where(p => p.CityId == CityId)
                                        .Where(P => P.PriceType == travel.PriceType)
                                        .ToArray();
            return places;
        }


        [HttpPost("getPlacesIdData")]
        public IEnumerable<PlaceToVisit> GetPlacesForTravelIdData([FromBody]TravelDTO travel)
        {
             var places = _context.Places.Where(p => p.CityId == travel.CityId)
                                        .Where(P => P.PriceType == travel.PriceType)
                                        .ToArray();
            return places;
        }


        [HttpPost("getPlacesByType")]
        public IEnumerable<PlaceToVisit> GetPlacesByType([FromBody]PlaceType placeType)
        {
            var places = _context.Places.Where(pl => pl.PlaceType == placeType)
                .Where(pl => pl.Status == 1).ToArray();
            return places;
        }


        [HttpPost("getNewPlaces")]
        public IEnumerable<PlaceToVisit> GetNewPlaces()
        {
            var places = _context.Places.Where(pl => pl.Status == 0).ToArray();
            return places;
        }


        // DELETE: 
        [HttpDelete("deletePlace")]
        public void DeletePlaceToVisit([FromBody]int id)
        {
            var placeToVisit = _context.Places.Find(id);          

            _context.Places.Remove(placeToVisit);
            _context.SaveChanges();            
        }

      
    }
}
