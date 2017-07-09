using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;

namespace HandGames
{
    public class LocalPlayer : Player
    {
        public override void OnTurnStart()
        {
            base.OnTurnStart();
        }
        
        [Flags]
        private enum AlertScreen
        {
            ChooseAPlayer = 1,
            NameACard = 2,
            ViewCards = 6
        }
        AlertScreen? CurrentAlertScreen;

        public LocalPlayer(HandGame Game) : base(Game) { }

        public override async Task<Player> TargetPlayer()
        {
            CurrentAlertScreen = AlertScreen.ChooseAPlayer;
            Player r = await (targetPlayer = new TaskCompletionSource<Player>()).Task;
            targetPlayer = null;
            CurrentAlertScreen = null;
            return r;
        }

        TaskCompletionSource<Player> targetPlayer;
        TaskCompletionSource<Texture2D> targetCard;
        
        static readonly Dictionary<AlertScreen, string> messages = new Dictionary<AlertScreen, string>
        {
            {AlertScreen.NameACard, "Choose a card" },
            {AlertScreen.ChooseAPlayer, "Choose a player" },
            {AlertScreen.ViewCards, "You have 2 seconds to look at these cards." }
        };

        public async override Task<Texture2D> TargetCard()
        {
            CurrentAlertScreen = AlertScreen.NameACard;
            cardsToDraw = Game.cardImages.GetRange(1, Game.cardImages.Count - 1);
            var r = await (targetCard = new TaskCompletionSource<Texture2D>()).Task;
            targetCard = null;
            CurrentAlertScreen = null;
            cardsToDraw = null;
            return r;
        }

        public async void Update ()
        {
            if (Game.players[Game.turnIdx] != this)
                return;
            if (CurrentAlertScreen == null)
            {
                foreach (var card in Hand.cards)
                {
                    MouseState mouseState = Mouse.GetState();
                    if (Hand.GetDrawingPosition(card).DrawPosition.Contains(mouseState.Position))
                    {
                        if (!Game.LastMouseDown)
                            card.Highlighted = true;
                        else
                        {
                            await card.Play();
                            break;
                        }
                    }
                    else
                        card.Highlighted = false;
                }
            }
            else
            {
                var state = Mouse.GetState();
                switch (CurrentAlertScreen)
                {
                    case AlertScreen.ChooseAPlayer:
                        if (Game.LastMouseDown)
                            foreach (var player in Game.players)
                            {
                                if (player.IsHandmaided)
                                    continue;
                                if (GetLocationOf(player).Contains(state.X, state.Y))
                                {
                                    if (player != null && !targetPlayer.Task.IsCompleted)
                                        targetPlayer.SetResult(player);
                                    break;
                                }
                            }
                        break;
                    case AlertScreen.NameACard:
                        for (int n = 0; n < Game.cardImages.Count; n++)
                            if (_getCardPosition(n).Contains(state.X, state.Y))
                            {
                                if (state.LeftButton == ButtonState.Pressed)
                                {
                                    if (Game.cardImages[n] != null && !targetCard.Task.IsCompleted)
                                        targetCard.SetResult(Game.cardImages[n]);
                                    break;
                                }
                            }
                        break;
                    default:
                        break;
                }
            }
        }

        static readonly Dictionary<AlertScreen, Action<LocalPlayer>> highlights = new Dictionary<AlertScreen, Action<LocalPlayer>>
        {
            {AlertScreen.ChooseAPlayer, @this => @this.DrawPlayers()},
            {AlertScreen.NameACard, @this => @this.DrawCards() }
        };

        public void Draw ()
        {
            Game.spriteBatch.Draw(Game.cardback, new Rectangle(Game.GraphicsDevice.Viewport.Width - 150 - Deck.cardWidth - 20, Game.GraphicsDevice.Viewport.Height - Deck.cardHeight, Deck.cardWidth, Deck.cardHeight), Color.Wheat);
            foreach (var card in new List<Card>(Game.discardPile.cards))
                card.Draw();
            DrawHands();
            foreach (var run in highlights)
                if ((run.Key | CurrentAlertScreen) == 0)
                    run.Value(this);

            if (CurrentAlertScreen != null)
            {
                string displayedText = messages[(AlertScreen)CurrentAlertScreen];
                Game.spriteBatch.Draw(Game.rectangle, Game.GraphicsDevice.Viewport.Bounds, new Color(Color.Black, .9f));
                Vector2 textMetrics = Game.choiceFont.MeasureString(displayedText);
                Vector2 textLoc = - textMetrics / 2;
                Game.spriteBatch.Draw(Game.rectangle, new Rectangle(textLoc.ToPoint() + (Game.GraphicsDevice.Viewport.Bounds.Size.ToVector2() / 2).ToPoint(), textMetrics.ToPoint()), Color.BlueViolet);
                Game.spriteBatch.DrawString(Game.choiceFont, displayedText, textLoc + Game.GraphicsDevice.Viewport.Bounds.Size.ToVector2() / 2, Color.Black);
            }
            foreach (var run in highlights)
                if ((run.Key | CurrentAlertScreen) != 0)
                    run.Value(this);
        }

        void DrawHands ()
        {
            for (int n = 0; n < Game.players.Count; n++)
            {
                var player = Game.players[n];
                foreach (var card in new List<Card>(player.Hand.cards))
                    card.Draw();
            }
        }

        void DrawPlayers ()
        {
            for (int n = 0; n < Game.players.Count; n++)
            {
                var player = Game.players[n];
                uint color = (uint)(0xff << (n << 3)) + 0xff000000;
                Rectangle r = GetLocationOf(player);
                Game.spriteBatch.Draw(Game.rectangle, r, new Color(color));
                if (player.lost)
                {
                    Game.spriteBatch.Draw(Game.rectangle, r, new Color(Color.Black, .5f));
                    Game.spriteBatch.Draw(Game.rectangle, new Rectangle(r.Location + new Point(35), new Point(30)), Color.Red);
                }
                else if (player.IsHandmaided)
                {
                    Game.spriteBatch.Draw(Game.rectangle, new Rectangle(r.Location + new Point(35), new Point(30)), Color.Blue);
                }
                else if (Game.players[Game.turnIdx] != player)
                    Game.spriteBatch.Draw(Game.rectangle, r, new Color(Color.White, .25f));
            }
        }

        Rectangle _getCardPosition(int index)
        {
            const int cardWidth = Hand.cardWidth, cardHeight = Hand.cardHeight;
            return new Rectangle(
                    Game.GraphicsDevice.Viewport.Width / 2 - cardsToDraw.Count * cardWidth / 2 + index * cardWidth,
                    Game.GraphicsDevice.Viewport.Height - cardHeight,
                    cardWidth,
                    cardHeight);
        }

        List<Texture2D> cardsToDraw;

        void DrawCards()
        {
            if (CurrentAlertScreen == AlertScreen.NameACard || CurrentAlertScreen == AlertScreen.ViewCards)
                for (int n = 0; n < cardsToDraw.Count; n++)
                    Game.spriteBatch.Draw(cardsToDraw[n], _getCardPosition(n), Color.White);
        }

        Rectangle GetLocationOf (Player player)
        {
            int index = ((Game.players.IndexOf(player) * 4 / Game.players.Count + (2 / Game.players.Count)) + 2) % 4;
            var size = new Point(100, 100);
            var position = new Point(
                (Game.GraphicsDevice.Viewport.Width  - size.X) * (index % 2),
                (Game.GraphicsDevice.Viewport.Height - size.Y) * (index / 2));
            return new Rectangle(position, size);
        }

        public override async Task LookAtCards(RealCardPool cardPool)
        {
            cardsToDraw = cardPool.cards.ConvertAll(v => v.image);
            CurrentAlertScreen = AlertScreen.ViewCards;
            await Task.Delay(2000);
            CurrentAlertScreen = null;
            cardsToDraw = null;
        }
    }
}
