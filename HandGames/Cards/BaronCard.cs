using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class BaronCard : LoveLetterCard
    {
        public override int Value => 3;

        public override async Task OnPlay()
        {
            Player
                me = ((Hand)@in).player;
            var other = await ((Hand)@in).player.TargetPlayer(); //Workaround for #2931
            var aCompare = ((LoveLetterCard)(other.Hand.cards[0])).Value;
            var bCompare = ((LoveLetterCard)(me.Hand.cards[0])).Value; //Workaround for #2918.
            switch (aCompare.CompareTo(bCompare))
            {
                case -1: // Good for me
                    other.Lose();
                    break;
                case 1: // Bad for me
                    me.Lose();
                    break;
            }
        }
    }
}
