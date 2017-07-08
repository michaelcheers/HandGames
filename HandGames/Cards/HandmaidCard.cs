using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class HandmaidCard : LoveLetterCard
    {
        public override int Value => 4;

        public override async Task OnPlay()
        {
            ((Hand)@in).player.IsHandmaided = true;
        }
    }
}
