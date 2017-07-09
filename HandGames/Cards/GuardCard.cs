using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class GuardCard : LoveLetterCard
    {
        public override int Value => 1;

        public override async Task OnPlay()
        {
            var player = await ((Hand)@in).player.TargetPlayer();
            var targettedCard = await ((Hand)@in).player.TargetCard(); //Workaround for #2918.
            if (player.Hand.cards[0].image == targettedCard)
                await player.Lose();
        }
    }
}
