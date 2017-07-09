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
            IEnumerable<Card> c = Hand.cards,
                o = c.OrderBy(v => ((Cards.LoveLetterCard)v).Value),
                l = o.ToList();
            var i = l.First();
            await i.Play();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public override async Task<Player> TargetPlayer() =>
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
            Game.players.OrderBy(v => v.IsHandmaided).ThenBy(v => v is AIPlayer).ToList()[0];

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public override async Task LookAtHand(Player player) { }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    }
}
