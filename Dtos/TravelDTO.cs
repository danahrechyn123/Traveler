﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Traveler.Entities;

namespace Traveler.Dtos
{
    public class TravelDTO
    {
        public string CityName { get; set; }
        public PriceType PriceType { get; set; }
        public int UserId { get; set; }
        public int PeopleAmount { get; set; }

    }
}
