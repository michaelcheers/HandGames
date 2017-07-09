using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public abstract class Player
    {
        public Hand Hand;
        public HandGame Game;
        public bool lost;
        public bool IsHandmaided;
        public MiddleTable tableMiddle;

        public async Task Lose ()
        {
            lost = true;
            var notLostPlayers = Game.players.Where(v => !v.lost);
            if (notLostPlayers.Count() == 1)
            {
                await (Game.won = notLostPlayers.First()).Lose();
            }
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task EndTurn()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            if (Game.won != null)
                return;
            Player player;
            do
            {
                player = Game.players[Game.turnIdx = (Game.turnIdx + 1) % Game.players.Count];
            } while (player.lost);
            player.OnTurnStart();
        }

        public abstract Task<Texture2D> TargetCard();
        public abstract Task<Player> TargetPlayer();
        public abstract Task LookAtCards(RealCardPool cardPool);
        public abstract Task LookAtHand(Player player);
        public List<Player> handsViewable = new List<Player>();
        
        public Player (HandGame Game)
        {
            Hand = new Hand(this.Game = Game, this);
            tableMiddle = new MiddleTable(Game, this);
        }

        public virtual async void OnTurnStart()
        {
            IsHandmaided = false;
            if (Game is LoveLetterGame)
                await Game.TopCard().MoveCardTo(Hand);
            var countess = Hand.cards.FirstOrDefault(v => v is Cards.CountessCard);
            if (countess != null)
            {
                var kingOrPrince = Hand.cards.FirstOrDefault(v => v is Cards.KingCard || v is Cards.PrinceCard);
                if (kingOrPrince != null)
                    await countess.Play();
            }
        }
    }
}
