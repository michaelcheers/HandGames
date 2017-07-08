using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class PrinceCard : LoveLetterCard
    {
        public override int Value => 5;

        public override async Task OnPlay()
        {
            var @in = (await ((Hand)this.@in).player.TargetPlayer()).Hand;
            foreach (var v in ((Hand)@in).cards)
                await v.MoveCardTo(@in.Game.discardPile);
            await @in.Game.TopCard().MoveCardTo(@in);
        }
    }
}
