using System;

namespace HandGames
{
    public class Program
    {
        public static void Main()
        {
            using (var game = new LoveLetterGame())
                game.Run();
        }
    }
}