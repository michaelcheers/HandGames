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

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public override async Task OnPlay()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
        }
    }
}
