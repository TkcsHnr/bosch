<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@1.0.1 C:\Users\hunor\OneDrive\Documents\Programozás\bosch\static\models\car2.glb --root /models/ --printwidth 120 --precision 2
Author: DScorp (https://sketchfab.com/Ivan.Newman)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/low-poly-car-tavria-1102turbo-1102-b40d2982994b485398208dcbd53277b8
Title: Low Poly car Tavria-1102(Turbo) Таврия-1102
-->

<script>
  import { Group } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  export const ref = new Group()

  const gltf = useGltf('/models/car2.glb')

  const component = forwardEventHandlers()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh
      geometry={gltf.nodes.Object_2.geometry}
      material={gltf.materials['02___Default']}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
