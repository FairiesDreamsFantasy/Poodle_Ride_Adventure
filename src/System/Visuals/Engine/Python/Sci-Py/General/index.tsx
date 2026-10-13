/**
 * Scientific Visuals Engine Python Sci-Py Image Convolution & Optical Physics Core Module
 * Kernel convolution for bloom, blur, edge detection, and physical reflectance optics.
 */

export class VisualsSciPyImageConvolution {
  /**
   * Applies a 3x3 kernel convolution to a 3x3 neighborhood matrix.
   */
  public apply3x3Kernel(matrix: number[][], kernel: number[][]): number {
    let sum = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        sum += matrix[r][c] * kernel[r][c];
      }
    }
    return sum;
  }

  /**
   * Generates a discrete normalized (2N+1)x(2N+1) 2D Gaussian convolution matrix.
   * Formula: G(x, y) = (1 / (2*pi*sigma^2)) * exp(-(x^2 + y^2) / (2*sigma^2))
   */
  public generateGaussianKernel(radius: number = 2, sigma: number = 1.0): number[][] {
    const size = radius * 2 + 1;
    const kernel: number[][] = Array.from({ length: size }, () => new Array(size).fill(0));
    const twoSigmaSq = 2 * sigma * sigma;
    let totalWeight = 0;

    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        const weight = Math.exp(-(x * x + y * y) / twoSigmaSq) / (Math.PI * twoSigmaSq);
        kernel[y + radius][x + radius] = weight;
        totalWeight += weight;
      }
    }

    // Normalize weights to sum exactly to 1.0 (energy conserving)
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        kernel[r][c] /= totalWeight;
      }
    }

    return kernel;
  }

  /**
   * Calculates Lambertian Diffuse Photometric Reflection:
   * I_diffuse = I_light * k_d * max(0, N . L)
   */
  public calculateLambertianDiffuse(
    normal: [number, number, number],
    lightDir: [number, number, number],
    diffuseCoeff: number = 0.8,
    lightIntensity: number = 1.0
  ): number {
    const dot = normal[0] * lightDir[0] + normal[1] * lightDir[1] + normal[2] * lightDir[2];
    const nDotL = Math.max(0, dot);
    return lightIntensity * diffuseCoeff * nDotL;
  }

  /**
   * Calculates Blinn-Phong Specular Reflection using the Halfway Vector:
   * H = (L + V) / ||L + V||
   * I_specular = I_light * k_s * (N . H)^shininess
   */
  public calculateBlinnPhongSpecular(
    normal: [number, number, number],
    lightDir: [number, number, number],
    viewDir: [number, number, number],
    specularCoeff: number = 0.5,
    shininess: number = 32.0,
    lightIntensity: number = 1.0
  ): number {
    // Halfway vector H = L + V
    const hx = lightDir[0] + viewDir[0];
    const hy = lightDir[1] + viewDir[1];
    const hz = lightDir[2] + viewDir[2];
    const hMag = Math.sqrt(hx * hx + hy * hy + hz * hz);
    if (hMag <= 0.0000001) return 0;

    const normH: [number, number, number] = [hx / hMag, hy / hMag, hz / hMag];
    const nDotH = Math.max(0, normal[0] * normH[0] + normal[1] * normH[1] + normal[2] * normH[2]);
    return lightIntensity * specularCoeff * Math.pow(nDotH, shininess);
  }

  /**
   * Schlick's Empirical Fresnel Approximation for specular reflections and mirror shine:
   * R(theta) = R_0 + (1 - R_0) * (1 - cos(theta))^5
   */
  public calculateSchlickFresnel(
    normal: [number, number, number],
    viewDir: [number, number, number],
    fresnelReflectanceZero: number = 0.04 // Base reflectance at 0 incidence (dielectric coat)
  ): number {
    const cosTheta = Math.max(0, Math.min(1, normal[0] * viewDir[0] + normal[1] * viewDir[1] + normal[2] * viewDir[2]));
    const oneMinusCos = 1.0 - cosTheta;
    const pow5 = oneMinusCos * oneMinusCos * oneMinusCos * oneMinusCos * oneMinusCos;
    return fresnelReflectanceZero + (1.0 - fresnelReflectanceZero) * pow5;
  }
}

export const VisualsSciPyImageConvolutionInstance = new VisualsSciPyImageConvolution();

