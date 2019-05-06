using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Traveler.Entities;

namespace Traveler.Services
{
    public interface IPlaceService
    {
        IEnumerable<PlaceToVisit> GetPlaces();

        void SuggestPlace(PlaceToVisit place);
        void AcceptPlace(int id);
    }

    public class PlaceService : IPlaceService
    {

        private DataContext dBcontext;

        public PlaceService(DataContext context)
        {
            this.dBcontext = context;
        }

        public void AcceptPlace(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PlaceToVisit> GetPlaces()
        {
            throw new NotImplementedException();
        }

        public void SuggestPlace(PlaceToVisit place)
        {
            dBcontext.Places.Add(place);
            dBcontext.SaveChanges();
        }
    }
}
