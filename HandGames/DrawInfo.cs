using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public struct DrawInfo
    {
        public Rectangle DrawPosition;
        public DrawPermission Permissions;
        public bool ShowCardBack;

        public enum DrawPermission
        {
            Undrawable,
            Animatable,
            Drawable
        }
    }
}
