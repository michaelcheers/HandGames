using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;

namespace HandGames
{
    public class AIPlayer : Player
    {
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<Texture2D> TargetCard()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            return Game.cardImages[3];
        }
        public AIPlayer(HandGame Game) : base(Game) { }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public override async Task LookAtCards(RealCardPool cardPool) { }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously

        public override async void OnTurnStart()
        {
            base.OnTurnStart();
            await Hand.cards.OrderBy(v => ((Cards.LoveLetterCard)v).Value).ToList()[0].Play();
        }
        public override async Task<Player> TargetPlayer() =>
            Game.players.OrderBy(v => v.IsHandmaided).ThenBy(v => v is AIPlayer).ToList()[0];
    }
}
