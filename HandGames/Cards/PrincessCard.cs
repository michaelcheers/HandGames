using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class PrincessCard : LoveLetterCard
    {
        public override int Value => 8;

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public override async Task OnDiscard()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            ((Hand)@in).player.Lose();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public override async Task OnPlay()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
        }
    }
}
