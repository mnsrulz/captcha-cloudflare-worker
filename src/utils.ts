import { data } from './../data/out-data.js';

export const generateM3u8 = () => {
    const list = []
    for (const d of data.filter(x=>x.title.includes('DJ'))) {
        const fo = d.formats
            //.filter(f=>f.filesize)
            .filter(f => f.protocol == 'm3u8_native')
            //.filter(f => f.format_note=='Default')
            //.filter(f => f.format.includes('234'))
            .filter(f => f.resolution == '1920x1080')
            .filter(f => f.vcodec.includes('avc1'))
            .map(({ vcodec, acodec, url, manifest_url, format_id, resolution, format_note, format }) =>
                 ({ vcodec, acodec, resolution, format_id, format, format_note, manifest_url }))
                ;
                fo && list.push(fo);
    }
    return list;
}

