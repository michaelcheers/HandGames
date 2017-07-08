using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework;

namespace HandGames
{
    public class DiscardPile : RealCardPool
    {
        public DiscardPile(HandGame game) : base(game)
        {
        }

        public const int cardWidth = Hand.cardWidth / 2;
        public const int cardHeight = Hand.cardHeight / 2;

        public override DrawInfo GetDrawingPosition(Card card) =>
            new DrawInfo
            {
                DrawPosition = new Rectangle(Game.GraphicsDevice.Viewport.Width - 100 - cardWidth - 10, (Game.GraphicsDevice.Viewport.Height - cardHeight) / 2, cardWidth, cardHeight),
                Permissions = cards[cards.Count - 1] == card ? DrawInfo.DrawPermission.Drawable : DrawInfo.DrawPermission.Animatable
            };
    }
}
