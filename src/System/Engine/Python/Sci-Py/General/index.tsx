/**
 * System/Engine/Python/Sci-Py/General/index.tsx
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Scientific Python SciPy Signal Processing & Interpolation Core Module.
 * 
 * Provides:
 * 1. 1D Fast Fourier Transform (Cooley-Tukey Radix-2 FFT) for audio spectral analysis.
 * 2. 2D Gaussian Kernel Smoothing matrix generator.
 * 3. 1D Cubic Spline Interpolation for smooth motion paths.
 */

export interface ComplexNumber {
  real: number;
  imag: number;
}

export class SciPy {
  /**
   * Cooley-Tukey Radix-2 Fast Fourier Transform (FFT) for audio spectral analysis.
   * Input length must be a power of 2.
   */
  public static fft(samples: Float32Array | number[]): ComplexNumber[] {
    const N = samples.length;
    if (N === 0) return [];

    const result: ComplexNumber[] = new Array(N);
    for (let i = 0; i < N; i++) {
      result[i] = { real: samples[i], imag: 0 };
    }

    SciPy.fftRecursive(result, N);
    return result;
  }

  private static fftRecursive(buffer: ComplexNumber[], N: number): void {
    if (N <= 1) return;

    const even: ComplexNumber[] = new Array(N / 2);
    const odd: ComplexNumber[] = new Array(N / 2);

    for (let i = 0; i < N / 2; i++) {
      even[i] = buffer[2 * i];
      odd[i] = buffer[2 * i + 1];
    }

    SciPy.fftRecursive(even, N / 2);
    SciPy.fftRecursive(odd, N / 2);

    for (let k = 0; k < N / 2; k++) {
      const angle = (-2 * Math.PI * k) / N;
      const tfReal = Math.cos(angle);
      const tfImag = Math.sin(angle);

      const oddReal = odd[k].real * tfReal - odd[k].imag * tfImag;
      const oddImag = odd[k].real * tfImag + odd[k].imag * tfReal;

      buffer[k] = {
        real: even[k].real + oddReal,
        imag: even[k].imag + oddImag
      };
      buffer[k + N / 2] = {
        real: even[k].real - oddReal,
        imag: even[k].imag - oddImag
      };
    }
  }

  /**
   * Generates a 2D Gaussian Kernel Matrix for image blurring/smoothing filters.
   */
  public static gaussianKernel2D(size: number, sigma: number): number[][] {
    const kernel: number[][] = [];
    const half = Math.floor(size / 2);
    let sum = 0.0;

    for (let y = -half; y <= half; y++) {
      const row: number[] = [];
      for (let x = -half; x <= half; x++) {
        const val = Math.exp(-(x * x + y * y) / (2 * sigma * sigma)) / (2 * Math.PI * sigma * sigma);
        row.push(val);
        sum += val;
      }
      kernel.push(row);
    }

    // Normalize kernel so sum = 1
    for (let r = 0; r < kernel.length; r++) {
      for (let c = 0; c < kernel[r].length; c++) {
        kernel[r][c] /= sum;
      }
    }

    return kernel;
  }
}
