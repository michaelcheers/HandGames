using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public class Pointer<T>
    {
        T value;
        public Pointer (T value)
        {
            this.value = value;
        }

        public void SetValue(T value) => this.value = value;

        public static implicit operator T (Pointer<T> value) =>
            value.value;
        public static T operator ~ (Pointer<T> value) =>
            value.value;
    }
}
