precision mediump float;

varying vec3 v_position;

uniform samplerCube u_cubemap;

void main()	
{
  vec3 col = vec3(0.);
  float distance = 1. / 2048.;
  float count = 0.;
  for (float x = -1.; x <= 1.0; x += 1.) 
  {
    for (float y = -1.; y <= 1.0; y += 1.) 
    {
      for (float z = -1.; z <= 1.0; z += 1.) 
      {
        vec3 offset = distance * vec3(x,y,z);
        col += textureCube(u_cubemap, vec3(v_position.x, v_position.y, v_position.z) + offset).rgb;
        count += 1.0;
      }
    }
  }

  col /= count;

  gl_FragColor = vec4(col, 1.0);
}
