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
                me = Caster;
            var other = await Caster.TargetPlayer(); //Workaround for #2931
            await Caster.LookAtHand(other);
            var aCompare = ((LoveLetterCard)(other.Hand.cards.First(v => v != this))).Value;
            var bCompare = ((LoveLetterCard)(me.Hand.cards.First(v => v != this))).Value; //Workaround for #2918.
            switch (aCompare.CompareTo(bCompare))
            {
                case -1: // Good for me
                    await other.Lose();
                    break;
                case 1: // Bad for me
                    await me.Lose();
                    break;
            }
        }
    }
}
