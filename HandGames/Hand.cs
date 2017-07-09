using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework;

namespace HandGames
{
    public class Hand : RealCardPool
    {
        public const int cardWidth = 150;
        public const int cardHeight = 209;
        public Player player;

        public Hand(HandGame game, Player player) : base(game)
        {
            this.player = player;
        }

        public override DrawInfo GetDrawingPosition(Card card) => 
            new DrawInfo
            {
                DrawPosition = new Rectangle(
                    Game.GraphicsDevice.Viewport.Width / 2 - cards.Count * cardWidth / 2 + cards.IndexOf(card) * cardWidth,
                    (Game.GraphicsDevice.Viewport.Height - cardHeight) * ((((Game.players.IndexOf(player) * 4 / Game.players.Count + (2 / Game.players.Count)) + 2) % 4) / 2),
                    cardWidth,
                    cardHeight),
                Permissions = DrawInfo.DrawPermission.Drawable,
                ShowCardBack = !(Game.ui == player ^ Game.ui.handsViewable.Contains(player))
            };
    }
}
