using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class CountessCard : LoveLetterCard
    {
        public override int Value => 7;

        public override async Task OnPlay()
        {
        }
    }
}
