using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public class MiddleTable : Hand
    {
        public MiddleTable(HandGame game, Player player) : base(game, player)
        {
        }

        public override DrawInfo GetDrawingPosition(Card card) =>
            new DrawInfo
            {
                DrawPosition = new Rectangle((Game.GraphicsDevice.Viewport.Width - cardWidth) / 2, (Game.GraphicsDevice.Viewport.Height - cardHeight) / 2, cardWidth, cardHeight),
                Permissions = DrawInfo.DrawPermission.Drawable,
                ShowCardBack = false
            };
    }
}
