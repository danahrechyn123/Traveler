using System;
using System.Collections.Generic;
using System.Text;

namespace Traveler.Entities
{
    public class Travel
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int CityId { get; set; }
        public virtual City City { get; set; }
        
        public DateTime DateFrom { get; set; }        
        public DateTime DateTill { get; set; }
        
        public PriceType PriceType { get; set; }

        public int PeopleAmount { get; set; }
    }
}
