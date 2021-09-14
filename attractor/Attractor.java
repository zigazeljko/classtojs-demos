public class Attractor {
    double a, b, c, d;

    public Attractor(double a, double b, double c, double d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    public byte[] render(double x0, double y0, int iter, int size) {
        int[] acc = accumulate(x0, y0, iter, size);
        int max = 1, n = size * size;
        byte[] image = new byte[n];
        for (int i = 0; i < n; i++) {
            max = Math.max(max, acc[i]);
        }
        for (int i = 0; i < n; i++) {
            double freq = acc[i] / (double)max;
            image[i] = (byte)Math.rint(255 - 255 * Math.cbrt(freq));
        }
        return image;
    }

    int[] accumulate(double x0, double y0, int iter, int size) {
        int half = size / 2;
        int[] acc = new int[size*size];
        for (int i = 0; i < iter; i++) {
            double x1 = Math.sin(a * y0) + c * Math.cos(a * x0);
            double y1 = Math.sin(b * x0) + d * Math.cos(b * y0);
            int x = (int)Math.rint(x1 * half / 3);
            int y = (int)Math.rint(y1 * half / 3);
            int j = x + (half + (y + half) * size);
            acc[j] += 1;
            x0 = x1;
            y0 = y1;
        }
        return acc;
    }
}
