using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class KingCard : LoveLetterCard
    {
        public override int Value => 6;

        public override async Task OnPlay()
        {
            var me = ((Hand)@in).player;
            var other = await me.TargetPlayer();
            await me.Hand.cards[0].MoveCardTo(other.Hand);
            await other.Hand.cards[0].MoveCardTo(me.Hand);
        }

    }
}
