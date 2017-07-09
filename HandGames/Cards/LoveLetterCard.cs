using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public abstract class LoveLetterCard : Card
    {
        public abstract int Value { get; }

        public override async Task Play()
        {
            var player = ((Hand)@in).player;
            int oldGameId = @in.Game.gameId;
            await base.Play();
            if (oldGameId == @in.Game.gameId)
                await player.EndTurn();
        }
    }
}
