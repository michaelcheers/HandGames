using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public abstract class Card
    {
        public CardPool @in;
        public Texture2D image;
        public bool Highlighted;
        public Rectangle? oldLoc;
        public Player Caster;

        public abstract Task OnPlay();
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public virtual async Task OnDiscard ()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {

        }

        public void Draw ()
        {
            if ((DateTime.Now - orgDate) > glideTime)
                if (!animationDone.Task.IsCompleted)
                    animationDone.SetResult(null);
            DrawInfo drawInfo = @in.GetDrawingPosition(this);
            Rectangle? newLoc = drawInfo.DrawPosition;
            if (newLoc == null)
                return;
            Rectangle rect = (Rectangle)newLoc;
            if (oldLoc != null)
            {
                Rectangle oldLocReal = (Rectangle)oldLoc;
                float glideN = ((float)(DateTime.Now - (DateTime)orgDate).Ticks / glideTime.Ticks);
                rect = new Rectangle(
                    Vector2.Lerp(oldLocReal.Location.ToVector2(), rect.Location.ToVector2(), glideN).ToPoint(),
                    Vector2.Lerp(oldLocReal.Size.ToVector2(), rect.Size.ToVector2(), glideN).ToPoint());
            }
            if (Highlighted)
            {
                Rectangle highlightRectangle = new Rectangle(rect.X - 1, rect.Y - 1, rect.Width + 1, rect.Height + 1);
                @in.Game.spriteBatch.Draw(@in.Game.rectangle, new Rectangle(highlightRectangle.Location, new Point(1, rect.Height)), Color.Yellow);
                @in.Game.spriteBatch.Draw(@in.Game.rectangle, new Rectangle(new Point(highlightRectangle.Right, highlightRectangle.Y), new Point(1, rect.Height)), Color.Yellow);
                @in.Game.spriteBatch.Draw(@in.Game.rectangle, new Rectangle(rect.X, highlightRectangle.Y, rect.Width, 1), Color.Yellow);
                @in.Game.spriteBatch.Draw(@in.Game.rectangle, new Rectangle(rect.X, highlightRectangle.Bottom, rect.Width, 1), Color.Yellow);
            }
            @in.Game.spriteBatch.Draw(drawInfo.ShowCardBack ? @in.Game.cardback : image, rect, Color.White);
            
        }

        public static readonly TimeSpan glideTime = TimeSpan.FromSeconds(.65);

        public virtual async Task Play ()
        {
            Caster = ((Hand)@in).player;
            await MoveCardTo(Caster.tableMiddle);
            await OnPlay();
            await MoveCardTo(@in.Game.discardPile);
            Caster = null;
        }

        public async Task MoveCardTo (CardPool to)
        {
            if (@in is Hand && to is DiscardPile)
                await OnDiscard();
            Highlighted = false;
            var oldPos = @in.GetDrawingPosition(this);
            @in.Remove(this);
            to.Add(this);
            if (!(oldPos.Permissions == DrawInfo.DrawPermission.Undrawable || to.GetDrawingPosition(this).Permissions == DrawInfo.DrawPermission.Undrawable))
            {
                oldLoc = oldPos.DrawPosition;
                orgDate = DateTime.Now;
                from = @in;
                animationDone = new TaskCompletionSource<object>();
                await animationDone.Task;
                animationDone = null;
                orgDate = null;
                from = null;
                oldLoc = null;
            }
        }

        TaskCompletionSource<object> animationDone;
        DateTime? orgDate;
        CardPool from;
    }
}
